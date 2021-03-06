function PNP() {

    PNP.prototype.define = function PNP() {
        this.ModelName = "PNP";
        this.PrametersValue = [[50],[0.1],[0],[0.02],[1.200e-10],[5.000e-09],[1.000e-12],[4.000e-13],[5.000e-13],[0.8],[0.4],[0.8],[0.333],[1.000e-15],[1.000e-15],[0.02585],[40]];
        this.ParametersName = [["Bf"],["Br"],["Is"],["Vak"],["Tauf"],["Taur"],["Ccs"],["Cje"],["Cjc"],["Phie"],["Me"],["Phic"],["Mc"],["Gbc"],["Gbe"],["Vt"],["EMinMax"]];

        var model = scicos_model();
        this.Typein = [];
        this.Typeout = [];
        this.MI = [];
        this.MO = [];
        this.P = [[100, 90, -2, 0], [0, 50, 2, 0], [100, 10, -2, 0]];
        this.PortName = [["C"], ["B"], ["E"]];

        for (var i = 0; i < size(this.P, "r"); i++) {
            if (this.P[i][2] == 1) {
                this.Typein.push(["E"]);
                this.MI.push(this.PortName[i]);
            }

            if (this.P[i][2] == 2) {
                this.Typein.push(["I"]);
                this.MI.push(this.PortName[i]);
            }
            if (this.P[i][2] == -1) {
                this.Typeout.push(["E"]);
                this.MO.push(this.PortName[i]);
            }
            if (this.P[i][2] == -2) {
                this.Typeout.push(["I"]);
                this.MO.push(this.PortName[i]);
            }
        }

        var mo = new modelica_function();
        model.sim = new ScilabString([this.ModelName]);
        mo.inputs = new ScilabString(...this.MI);
        mo.outputs = new ScilabString(...this.MO);
        model.rpar = new ScilabDouble(...this.PrametersValue);

        var arr = [];
        arr.push(zeros(getData(this.ParametersName)));
        mo.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...math.transpose(arr)));
        var exprs = new ScilabString(["50"], ["0.1"], ["1.e-16"], ["0.02"], ["0.12e-9"], ["5e-9"], ["1e-12"], ["0.4e-12"], ["0.5e-12"], ["0.8"], ["0.4"], ["0.8"], ["0.333"], ["1e-15"], ["1e-15"], ["0.02585"], ["40"]);
        var gr_i = "xstringb(orig(1),orig(2),\"PNP\",sz(1),sz(2));"
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        mo.model = new ScilabString([this.ModelName]);
        model.equations = mo;
        model.in = new ScilabDouble(...ones(size(this.MI, "*"), 1));
        model.out = new ScilabDouble(...ones(size(this.MO, "*"), 1));
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, list(new ScilabString([gr_i]), new ScilabDouble([0])));
        this.x.graphics.in_implicit = new ScilabDouble(...this.Typein);
        this.x.graphics.out_implicit = new ScilabDouble(...this.Typeout);

        return new BasicBlock(this.x);
    }

    PNP.prototype.details = function PNP() {
        return this.x;
    }
    PNP.prototype.get = function PNP() {
        var options={
            Bf:["Bf  : Forward beta","50"],
            Br:["Br  : Reverse beta","0.1"],
            Is:["Is  : Transport saturation current","1.e-16"],
            Vak:["Vak : Early voltage (inverse), 1/Volt","0.02"],
            Tauf:["Tauf: Ideal forward transit time","0.12e-9"],
            Taur:["Taur: Ideal reverse transit time","5e-9"],
            Ccs:["Ccs : Collector-substrat(ground) cap.","1e-12"],
            Cje:["Cje : Base-emitter zero bias depletion cap.","0.4e-12"],
            Cjc:["Cjc : Base-coll. zero bias depletion cap.","0.5e-12"],
            Phie:["Phie: Base-emitter diffusion voltage","0.8"],
            Me:["Me  : Base-emitter gradation exponent","0.4"],
            Phic:["Phic: Base-collector diffusion voltage","0.8"],
            Mc:["Mc  : Base-collector gradation exponent","0.333"],
            Gbc:["Gbc : Base-collector conductance","1e-15"],
            Gbe:["Gbe : Base-emitter conductance","1e-15"],
            Vt:["Vt  : Voltage equivalent of temperature","0.02585"],
            EMinMax:["EMinMax: if x > EMinMax, the exp(x) function is linearized","40"],
        }
        return options
    }
PNP.prototype.set = function PNP() {
    this.Bf = parseFloat((arguments[0]["Bf"]))
    this.Br = parseFloat((arguments[0]["Br"]))
    this.Is = parseFloat((arguments[0]["Is"]))
    this.Vak = parseFloat((arguments[0]["Vak"]))
    this.Tauf = parseFloat((arguments[0]["Tauf"]))
    this.Taur = parseFloat((arguments[0]["Taur"]))
    this.Ccs = parseFloat((arguments[0]["Ccs"]))
    this.Cje = parseFloat((arguments[0]["Cje"]))
    this.Cjc = parseFloat((arguments[0]["Cjc"]))
    this.Phie = parseFloat((arguments[0]["Phie"]))
    this.Me = parseFloat((arguments[0]["Me"]))
    this.Phic = parseFloat((arguments[0]["Phic"]))
    this.Mc = parseFloat((arguments[0]["Mc"]))
    this.Gbc = parseFloat((arguments[0]["Gbc"]))
    this.Gbe = parseFloat((arguments[0]["Gbe"]))
    this.Vt = parseFloat((arguments[0]["Vt"]))
    this.EMinMax = parseFloat((arguments[0]["EMinMax"]))
    this.ParametersName = [["Bf"],["Br"],["Is"],["Vak"],["Tauf"],["Taur"],["Ccs"],["Cje"],["Cjc"],["Phie"],["Me"],["Phic"],["Mc"],["Gbc"],["Gbe"],["Vt"],["EMinMax"]];
    //this.ParametersValue = new ScilabDouble([this.Bf],[this.Br],[this.Is],[this.Vak],[this.Tauf],[this.Taur],[this.Ccs],[this.Cje],[this.Cjc],[this.Phie],[this.Me],[this.Phic],[this.Mc],[this.Gbc],[this.Gbe],[this.Vt],[this.EMinMax])
    var arr = [];
    arr.push(zeros(getData(this.ParametersName)));
    this.x.model.equations.parameters = list(new ScilabString(...this.ParametersName),this.ParametersValue = list(new ScilabDouble([this.Bf]),new ScilabDouble([this.Br]),new ScilabDouble([this.Is]),new ScilabDouble([this.Vak]),new ScilabDouble([this.Tauf]),new ScilabDouble([this.Taur]),new ScilabDouble([this.Ccs]),new ScilabDouble([this.Cje]),new ScilabDouble([this.Cjc]),new ScilabDouble([this.Phie]),new ScilabDouble([this.Me]),new ScilabDouble([this.Phic]),new ScilabDouble([this.Mc]),new ScilabDouble([this.Gbc]),new ScilabDouble([this.Gbe]),new ScilabDouble([this.Vt]),new ScilabDouble([this.EMinMax])), new ScilabDouble(...zeros(this.ParametersName)))
   // this.x.model.equations.parameters = list(new ScilabString(...this.ParametersName), new ScilabDouble(...this.PrametersValue), new ScilabDouble(...math.transpose(arr)));
    var exprs = new ScilabString([this.Bf],[this.Br],[this.Is],[this.Vak],[this.Tauf],[this.Taur],[this.Ccs],[this.Cje],[this.Cjc],[this.Phie],[this.Me],[this.Phic],[this.Mc],[this.Gbc],[this.Gbe],[this.Vt],[this.EMinMax])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    PNP.prototype.get_popup_title = function PNP() {
        var set_param_popup_title="Set PNP block parameters";
        return set_param_popup_title
    }
}
